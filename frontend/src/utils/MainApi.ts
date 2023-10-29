/* eslint-disable no-undef */

import { IFilter } from '../store/filter';

/* eslint-disable class-methods-use-this */
interface Data {
  [key: string]: string;
}

class MainApi {
  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getResponseData(res: Response): Promise<never | Data> {
    if (res.ok) {
      return res.json();
    }

    const error = await res.text();
    return Promise.reject(JSON.parse(error));
  }

  private setPostOptions(body: Data) {
    return {
      method: 'POST',
      credentials: 'include' as RequestCredentials,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }

  private setGetOptions(token: string) {
    return {
      method: 'GET',
      credentials: 'include' as RequestCredentials,
      headers: {
        Authorization: `Token ${token}`,
      },
    };
  }

  public async signIn(username: string, password: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/auth/token/login/`,
      this.setPostOptions({ username, password }),
    );

    return this.getResponseData(res);
  }

  public async getUser(token: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/users/me/`,
      this.setGetOptions(token),
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

  public async getCandidates(token: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/candidates/`,
      this.setGetOptions(token),
    );

    return this.getResponseData(res);
  }

  public async getShortCandidates(token: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/short_candidates/`,
      this.setGetOptions(token),
    );

    return this.getResponseData(res);
  }

  public async getCandidateExperience(token: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/experience_detailed/`,
      this.setGetOptions(token),
    );

    return this.getResponseData(res);
  }

  public async getCandidateEducation(token: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/v1/education/`,
      this.setGetOptions(token),
    );

    return this.getResponseData(res);
  }

  public async getFilterCandidates(token: string, filterValue: IFilter): Promise<never | Data> {
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
      this.setGetOptions(token),
    );

    return this.getResponseData(res);
  }
}

const mainApi = new MainApi('http://84.201.133.88:8000/api');

export default mainApi;
