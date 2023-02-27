import { Injectable } from '@angular/core';
@Injectable()
export class Config {
	public webApiUrl = 'https://strokehomecare.com/api/v1/users';
    public imageUploadUrl = 'https://strokehomecare.com/uploads/upload.php';
    public imageUploadsFolder = 'https://strokehomecare.com/uploads';
    public webUrl = 'https://strokehomecare.com/';
}