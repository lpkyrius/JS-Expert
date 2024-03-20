export default class NotificationContext {
    constructor() {
        this.notification = []
    }

    hasNotifications() {
        return this.notification.length > 0
    }

    addNotification(notification) {
        this.notification.push(notification)
    }
}