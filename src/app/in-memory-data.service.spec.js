"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var in_memory_data_service_1 = require("./in-memory-data.service");
describe('InMemoryDataService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(in_memory_data_service_1.InMemoryDataService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=in-memory-data.service.spec.js.map