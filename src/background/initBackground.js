import { Plugins } from '@capacitor/core';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { get } from '../storage/databaseApi';
import { isAfter } from '../utils/utils';
import { scheduleNotifications } from './localNotifications';

const findEarliestDueMedicine = (medicines) => {
  const currentDate = new Date();
  let difference = Number.MAX_VALUE;
  let earliestDueMedicine = null;
  for (let i = 0; i < medicines.length; i++) {
    const medicine = medicines[i];
    const lastDueTime = Date.parse(medicine.lastDueTime);
    const lastDueTimeInDate = new Date(lastDueTime);
    const currentDifference = lastDueTimeInDate - currentDate;
    if (currentDifference < difference) {
      difference = currentDifference;
      earliestDueMedicine = medicine;
    }
  }
  return earliestDueMedicine;
}

export function initializeBackgroundTask() {
  console.log("Initializing background tasks");
  const { App, BackgroundTask } = Plugins;
  App.addListener('appStateChange', (state) => {

    if (!state.isActive) {
      // The app has become inactive. We should check if we have some work left to do, and, if so,
      // execute a background task that will allow us to finish that work before the OS
      // suspends or terminates our app:

      let taskId = BackgroundTask.beforeExit(async () => {
        // In this function We might finish an upload, let a network request
        // finish, persist some data, or perform some other task

        // Example of long task
        const medicines = get("medicines");
        medicines.forEach(
          medicine => {
            medicine.times.forEach(
              time => scheduleLocalNotification(medicine.name, time, medicine.startDate, medicine.endDate)
            )
          }
        );
        // Must call in order to end our task otherwise
        // we risk our app being terminated, and possibly
        // being labeled as impacting battery life
        BackgroundTask.finish({
          taskId
        });
      });
    }
  });

  const scheduleLocalNotification = (name, time, startDate, endDate) => {

    // const getTimeFromMedicine = (time, startDate, endDate) => {
    //   const now = Date.now();
    //   const endDateNextDay = Date.parse(endDate);
    //   endDateNextDay = endDateNextDay.setDate(endDateNextDay.getDate() + 1)
    //   const compareTime = Date.parse(startDate);
    //   compareTime.setHours(time.hours);
    //   compareTime.setMinutes(time.minutes);
    //   while(isAfter(compareTime, now) && isAfter(endDateNextDay, compareTime) {
        
    //   }
    // }

    function getTimeFromMedicine(time, startDate, endDate) {
      const currentTime = new Date();
      if(isAfter(currentTime, Date.parse(startDate)) && isAfter(Date.parse(endDate), currentTime)) {
        currentTime.setHourse(time.hours);
        currentTime.setMinutes(time.minutes);
      }
      console.log("Local notification set at : " , currentTime);
      return currentTime;
    }
    
    const currentDate = new Date();
    currentDate.setHours(time.hours);
    currentDate.setMinutes(time.minutes);
    currentDate.setSeconds(0);
    LocalNotifications.schedule(
      {
        id: `${name}-${time.hours}-${time.minutes}`,
        text: `${name} is due now(${time.hours}:${time.minutes})`,
        title: "Example",
        trigger: {
          at: getTimeFromMedicine(time, startDate, endDate)
        }
      }
    )
  }
}