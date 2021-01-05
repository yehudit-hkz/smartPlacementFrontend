import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any {
    if(items != undefined)
      return items.filter(item => item.name.includes(term));
  }

}
