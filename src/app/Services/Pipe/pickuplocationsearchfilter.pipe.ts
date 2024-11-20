import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pickuplocationsearchfilter'
})
export class PickuplocationsearchfilterPipe implements PipeTransform {

 
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    return this.searchItems(items, searchText.toLowerCase());
  }

  private searchItems(items: any[], searchText: string): any[] {

   let results: any[] = [];
   console.log(items);
      items.forEach(it => {
        console.log(it);
        if (it.address1.toLowerCase().includes(searchText)|| it.zipcode.toLowerCase().includes(searchText)) {
            results.push(it);
        
        }
      });
      return results;
  }
}
