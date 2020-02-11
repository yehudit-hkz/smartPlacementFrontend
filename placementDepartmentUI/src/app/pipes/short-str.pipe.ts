import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortStr'
})
export class ShortStrPipe implements PipeTransform {

  transform(value: string,active?: boolean): string {
    if (value.length>55)
    return value.substr(0,value.substr(0,55).lastIndexOf(' '))+"...";
   return value;  }

}
