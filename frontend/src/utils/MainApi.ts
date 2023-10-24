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

  private setOptions(body: Data) {
    return {
      method: 'POST',
      credentials: 'include' as RequestCredentials,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }

  public async signIn(username: string, password: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/auth/token/login`,
      this.setOptions({ username, password }),
    );

    return this.getResponseData(res);
  }

  public async getUser(token: string): Promise<never | Data> {
    const res = await fetch(
      `${this.baseUrl}/users/me`,
      {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
          Authorization: `Token ${token}`,
        },
      },
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
}

const mainApi = new MainApi('http://127.0.0.1:8000/api');

export default mainApi;
