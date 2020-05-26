import { SiteCreationService } from './siteCreate.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Geek Joke';
  siteLabel: string = 'Click the button to create site';
  errorMessage: string;

  constructor(private readonly siteCreateService: SiteCreationService) { }

  async fetchSite() {
    this.siteLabel = 'returnning result...';
    // this.joke = await this.siteCreateService.getSite();

    this.siteCreateService.getSite().subscribe({
       next: site => this.siteLabel = site,
       error: err => this.siteLabel = err
     });
  }

}
