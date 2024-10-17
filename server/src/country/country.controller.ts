import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get('available-countries')
    async getAvailableCountries(): Promise<any> {
        return this.countryService.getAvailableCountries();
    }

    @Get('country-info/:countryCode')
    async getCountryInfo(@Param('countryCode') countryCode: string): Promise<any> {
        return this.countryService.getCountryInfo(countryCode);
    }
}
