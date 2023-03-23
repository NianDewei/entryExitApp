import { Pipe, PipeTransform } from '@angular/core';
import { EntryExit } from '../interfaces/entry-exit';

@Pipe({
  name: 'orderEntry',
  standalone: true,
})
export class OrderEntryPipe implements PipeTransform {
  transform(items: EntryExit[]) {
    const newOrder = [...items];

    newOrder.sort((a, b) => {
      if (a.type !== 'entry') return 1;
      return -1;
    });

    return newOrder;
  }
}
