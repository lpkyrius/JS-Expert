export default class Marketing {
    update({ id, userName }) {
        // Important: the [update] is responsible for managing its errors/exceptions
        // we should not have [await] in [notify] because the notify's responsibility is only to sent events
        // The notify only notifies everyone. It could be a microservice, a service totally isolated.
        console.log(`[${id}]: [marketing] will send an welcome email to [${userName}]`);
    }
}