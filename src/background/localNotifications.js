import { LocalNotifications } from "@ionic-native/local-notifications";

export function scheduleNotifications(medicines) {
    const formatDateTime = () => {
        const date = new Date();
        return date.toTimeString();
    }
    const localNotifications = LocalNotifications;
    console.log("local notifications");
    console.log(medicines);
    medicines.filter(medicine => medicine !== null).forEach(
        medicine => {
            localNotifications.schedule(
                {
                    id: medicine.medicineName,
                    text: `${medicine.medicineName} is due now at ${formatDateTime()}`,
                    title: "Example",
                    trigger: {
                        at: new Date()
                    }
                }
            )
        }
    )
}