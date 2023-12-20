import { expect, describe, test, jest, beforeEach } from '@jest/globals';

import { InjectHttpInterceptor } from './agent.js';
import { Server } from 'http';

// for safe: let's create a copy of the original http module
const originalHttp = jest.createMockFromModule('http');

describe('HTTP Interceptor Agent', () => {
    const eventName = 'request';
    const request = null;
    beforeEach(() => jest.clearAllMocks());

    test('should not change header', () => {
        const response = {
            setHeader: jest.fn().mockReturnThis()
        }

        const serverInstance = new originalHttp.Server();
        serverInstance.emit(eventName, request, response);
        // nothing has intercepted it, so should have not been called
        expect(response.setHeader).not.toHaveBeenCalled();

    })
    test('should activate header interceptor', () => {
        InjectHttpInterceptor();

        const response = {
            setHeader: jest.fn().mockReturnThis()
        }

        const serverInstance = new Server();
        serverInstance.emit(eventName, request, response);
        // nothing has intercepted it, so should have not been called
        expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'LeandroPassos');

    })
})