import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CountryService {
    private readonly dateNagerApiUrl: string;
    private readonly countriesNowApiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.dateNagerApiUrl = this.configService.get<string>('DATE_NAGER_API');
        this.countriesNowApiUrl = this.configService.get<string>('COUNTRIES_NOW_API');
    }

    getAvailableCountries(): Observable<any> {
        return this.httpService.get(`${this.dateNagerApiUrl}/AvailableCountries`).pipe(
            map(response => response.data)
        );
    }

    getCountryInfo(countryCode: string): Observable<{ borders: any; populationUrl: string; flagUrl: string }> {
        const countryInfoUrl = `${this.dateNagerApiUrl}/CountryInfo/${countryCode}`;
        const populationUrl = `${this.countriesNowApiUrl}/countries/population`;
        const flagUrl = `${this.countriesNowApiUrl}/countries/flag/images`;

        return this.httpService.get(countryInfoUrl).pipe(
            map(response => {
                const countryData = response.data;
                const countryName = response.data.commonName;
                const borders = countryData.borders || [];
                return {
                    countryName,
                    borders,
                    populationUrl,
                    flagUrl,
                };
            })
        );
    }
}
