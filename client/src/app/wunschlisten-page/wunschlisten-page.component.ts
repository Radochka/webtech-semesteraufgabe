import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Wunschliste } from '../shared/interface';
import { WishlistService } from '../shared/services/wishlist.service';

@Component({
  selector: 'app-wunschlisten-page',
  templateUrl: './wunschlisten-page.component.html',
  styleUrls: ['./wunschlisten-page.component.css']
})
export class WunschlistenPageComponent implements OnInit {
//type Observable, weil methode getLists erwartet dieser type
  wunschlisten!: Observable<Wunschliste[]>
  constructor(private wl: WishlistService) { }

  ngOnInit(): void {
    this.wunschlisten = this.wl.getLists()
  }

}
