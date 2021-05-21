import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateMicrosoft } from './models/updates';
import { UpdatesService } from './services/updates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  update = {} as UpdateMicrosoft;
  updates: UpdateMicrosoft[] = [];
  filter: string = '';

  dataSource : any;

  displayedColumns: string[] = ['id', 'Alias', 'DocumentTitle', 'Severity', 'InitialReleaseDate', 'CurrentReleaseDate', 'CvrfUrl'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private updatesService: UpdatesService) {}

  ngOnInit() {
    this.getUpdates();
  }

   // Chama o serviço para obtém todos os updates
   getUpdates() {
    this.updatesService.getUpdates().subscribe((updates: UpdateMicrosoft[]) => {
      this.updates = updates;
      this.dataSource = new MatTableDataSource(updates);
    });
  }

    // copia o update para ser editado.
    editUpdates(update: UpdateMicrosoft) {
      this.update = { ...update };
    }

    // limpa o formulario
    /*
    cleanForm(form: NgForm) {
      this.getUpdates;
      form.resetForm();
      update = {} as Updates;
    }
    */
}
