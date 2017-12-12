import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (value == null) {
      return null;
    }
    else {
      let newValue = value.replace('_', " ");
      return `${newValue}`;
    }
  }
}
