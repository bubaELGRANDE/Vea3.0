import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { ICategory } from '../../interface/IPublishing';
import { ToastrService } from 'ngx-toastr';
import { formatHttpError } from '../../../../core/helpers/formatHttpError';

@Component({
  selector: 'app-tag-list',
  imports: [],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss'
})
export class TagListComponent implements OnInit {

  taglist: any[] = [];
  selectedTags: any[] = [];
  @Output() selectedTag = new EventEmitter<any>

  constructor(private toastr: ToastrService, private catalogoService: CatalogosService) { }

  ngOnInit(): void {
    this.reloadAll()
  }

  reloadAll() {
    this.catalogoService.getCategories().subscribe({
      next: (response) => {
        this.taglist = response
      },
      error: (err) => {
        const { errors, message } = formatHttpError(err)
        this.toastr.error(message, errors)
      }
    })
  }

  addTag(tag: any): void {
    if (!this.selectedTags.find(t => t.category === tag.category)) {
      this.selectedTags.push(tag);
      this.selectedTag.emit(this.selectedTags);
    }
  }

  removeTag(tag: any): void {
    this.selectedTags = this.selectedTags.filter(t => t.category !== tag.category);
    this.selectedTag.emit(this.selectedTags);
  }
}
