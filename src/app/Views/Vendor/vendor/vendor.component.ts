import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vform!: FormGroup;
  formSubmitted: boolean = false;
  location: { lat: number; lng: number } | null = null;
  google: any;
  selectedFile: File | null = null;
  constructor(public fb: FormBuilder,
    public apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
   
    this.vform = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Validates 10-digit phone number
      cityName: ['', Validators.required],
      state: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      ownerEmail: ['', [Validators.required, Validators.email]],
      ownerPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Validates a 10-digit phone number
      ownerAddress: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], // Ensures minimum password length of 6
      storeLogo: ['', Validators.required],
      storeCoverImage: ['', Validators.required]
    });
    this.initializeAutocomplete();
  }


  initializeAutocomplete(): void {
    const input = document.getElementById('autocomplate') as HTMLInputElement;

    // Initialize Google Maps Places Autocomplete
    const autocomplete = new google.maps.places.Autocomplete(input);

    // Listen for place selection
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      // Check if place has geometry
      if (place.geometry && place.geometry.location) {
        this.location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        console.log('Selected Location:', this.location);
      } else {
        console.error('No details available for input: ' + input.value);
      }
    });
  }

  addVendor() {
    this.formSubmitted = true;
    if (!this.vform.valid)
     // return false;
    this.apiService.postapi('api/Vendor/CreateVendor', this.vform.value).subscribe(resp => {
      if(resp.status){       
       this.toastr.success(resp.message);  
     }
     else{
       this.toastr.error(resp.message);
     }
    });
  }
  fileProgress(fileInput: any) {
    this.selectedFile = fileInput.target.files[0];
  }
}
