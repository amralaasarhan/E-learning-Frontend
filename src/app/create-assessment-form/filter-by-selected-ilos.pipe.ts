import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySelectedILOs'
})
export class FilterBySelectedILOsPipe implements PipeTransform {
  transform(courseILOs: any[], selectedILOIds: number[]): any[] {
    if (!courseILOs || !selectedILOIds || selectedILOIds.length === 0) {
      return [];
    }

    return courseILOs.filter(ilo => selectedILOIds.includes(ilo.courseIloId));
  }
}
