/* eslint-disable no-undef */

import { IFilter } from '../store/filter';
import { ICandidate } from '../store/foundCandidates/foundCandidates';

/* eslint-disable class-methods-use-this */
interface Data {
  [key: string]: string;
}

class MainApi {
  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getResponseData<T>(res: Response): Promise<never | T> {
    if (res.ok) {
      return res.json();
    }

    const error = await res.text();
    return Promise.reject(JSON.parse(error));
  }

  private setPostOptions(body: Data, withoutToken?: boolean): RequestInit {
    const token = localStorage.getItem('token');

    return {
      method: 'POST',
      credentials: 'include' as RequestCredentials,
      headers: {
        'Content-Type': 'application/json',
        ...(token && !withoutToken ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify(body),
    };
  }

  private setGetOptions(): RequestInit {
    const token = localStorage.getItem('token');

    return {
      method: 'GET',
      credentials: 'include' as RequestCredentials,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    };
  }

  private setGetPDFOptions(): RequestInit {
    const token = localStorage.getItem('token');

    return {
      method: 'GET',
      credentials: 'include' as RequestCredentials,
      headers: {
        'Content-Type': 'application/pdf',
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    };
  }

  private setDeleteOptions() {
    const token = localStorage.getItem('token');

    return {
      method: 'DELETE',
      credentials: 'include' as RequestCredentials,
      headers: {
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    };
  }

  public async signIn(username: string, password: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/auth/token/login/`,
      this.setPostOptions({ username, password }, true),
    );

    return this.getResponseData(res);
  }

  public async getUser(): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/users/me/`,
      this.setGetOptions(),
    );

    return this.getResponseData(res);
  }

  public async logOut(token: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/auth/token/logout/`,
      {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return this.getResponseData(res);
  }

  public async getCandidates(): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/candidates/`,
      this.setGetOptions(),
    );

    return this.getResponseData(res);
  }

  public async getShortCandidates(): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/short_candidates/`,
      this.setGetOptions(),
    );

    return this.getResponseData(res);
  }

  public async getCandidateExperience(): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/experience_detailed/`,
      this.setGetOptions(),
    );

    return this.getResponseData(res);
  }

  public async getCandidateEducation(): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/education/`,
      this.setGetOptions(),
    );

    return this.getResponseData(res);
  }

  public async getFilterCandidates(filterValue: IFilter): Promise<never | Data> {
    const filterTags: string[] = [];

    if (filterValue.specialization) {
      filterTags.push(`specialization_id=${filterValue.specialization}`);
    }

    if (filterValue.course) {
      filterValue.course.forEach((item) => filterTags.push(`course=${item}`));
    }

    if (filterValue.hards) {
      filterValue.hards.forEach((item) => filterTags.push(`hards=${item}`));
    }

    if (filterValue.experience) {
      filterValue.experience.forEach((item) => filterTags.push(`experience_id=${item}`));
    }

    if (filterValue.level) {
      filterValue.level.forEach((item) => filterTags.push(`level_id=${item}`));
    }

    if (filterValue.location) {
      filterValue.location.forEach((item) => filterTags.push(`location=${item}`));
    }

    if (filterValue.employmentType) {
      filterValue.employmentType.forEach((item) => filterTags.push(`employment_type=${item}`));
    }

    if (filterValue.workSchedule) {
      filterValue.workSchedule.forEach((item) => filterTags.push(`work_schedule=${item}`));
    }

    const res = await fetch(
      `${this.baseUrl}/v1/candidates/?${filterTags.join('&')}`,
      this.setGetOptions(),
    );

    return this.getResponseData(res);
  }

  public async addCandidateToFavoriteList() {
    const res = await fetch(
      `${this.baseUrl}/v1/candidates?is_tracked=true`,
      this.setGetOptions(),
    );

    return this.getResponseData<ICandidate[]>(res);
  }

  public async addCandidateToFavorites(id: number): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/candidates/${id}/track/`,
      this.setPostOptions({}),
    );

    return this.getResponseData(res);
  }

  public async removeCandidateFromFavorites(id: number): Promise<Response> {
    const res = await fetch(
      `${this.baseUrl}/v1/candidates/${id}/track/`,
      this.setDeleteOptions(),
    );

    return res;
  }

  public async getCandidateResume(id: string): Promise<Response> {
    const res = await fetch(
      `${this.baseUrl}/v1/candidates/${id}/download-candidate/`,
      this.setGetPDFOptions(),
    );

    return res;
  }
}

const mainApi = new MainApi('http://84.201.133.88:8000/api');

export default mainApi;
