import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../app/app.config';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(public http: HttpClient, private config: Config) {

  }


  async getAllVideos(tokenData){
    return new Promise((resolve, reject) => {
      this.http.get(this.config.webApiUrl + "/shc/get_videos", { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
}


  async checkIfHasAddedPatientCareGiverDetails(tokenData) {
    return new Promise((resolve, reject) => {
      let data = {};
      this.http.post(this.config.webApiUrl + "/shc/check_patient_caregiver_details", data, { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  async getPatientDetails(tokenData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.config.webApiUrl + "/shc/get_patient_details", { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  async getCaregiverDetails(tokenData) {  
    return new Promise((resolve, reject) => {
      this.http.get(this.config.webApiUrl + "/shc/get_caregiver_details", { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  async addUpdatePatient(tokenData, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.webApiUrl + "/shc/add_update_patient", data, { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  async addUpdateCareGiver(tokenData, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.webApiUrl + "/shc/add_update_caregiver", data, { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }


  async getPreferredScheduleDates(tokenData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.config.webApiUrl + "/shc/get_preferred_schedules", { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  async addPreferredScheduleDates(tokenData, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.webApiUrl + "/shc/add_preferred_schedules", data, { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  async getPatientSymptoms(tokenData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.config.webApiUrl + "/shc/get_symptoms", { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  async updatePatientSymptoms(tokenData, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.webApiUrl + "/shc/update_symptoms", data, { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  async uploadFeedbackVideos(tokenData, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.webApiUrl + "/shc/upload_feedback_video", data, { headers: tokenData })
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

}
