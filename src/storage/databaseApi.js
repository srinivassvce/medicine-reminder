import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

export async function set(key, value) {
    if(value == null) {
        return;
    }
    await Storage.set({
        key,
        value: JSON.stringify(value)
    })
}

export async function get(key) {
    const item = await Storage.get({key});
    if(item.value === null) {
        return [];
    }
    return JSON.parse(item.value);
}

export async function remove(key) {
    await Storage.remove(key);
}