/* eslint-disable no-undef */
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
}

const mainApi = new MainApi('http://84.201.133.88:8000/api');

export default mainApi;
