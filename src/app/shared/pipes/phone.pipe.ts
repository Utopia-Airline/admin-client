import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(tel: string, format?: string): string {
    const value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return tel;
    }
    let country;
    let city;
    let phoneNumber;
    switch (value.length) {
      case 10: // +1PPP####### -> C (PPP) ###-####
        country = 1;
        city = value.slice(0, 3);
        phoneNumber = value.slice(3);
        break;

      case 11: // +CPPP####### -> CCC (PP) ###-####
        country = value[0];
        city = value.slice(1, 4);
        phoneNumber = value.slice(4);
        break;

      case 12: // +CCCPP####### -> CCC (PP) ###-####
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        phoneNumber = value.slice(5);
        break;

      default:
        return tel;
    }

    if (country === 1) {
      country = '';
    }

    phoneNumber = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3);

    return (country + ' (' + city + ') ' + phoneNumber).trim();
  }

}
