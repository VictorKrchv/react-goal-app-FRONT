import { httpClient } from "./index";
import { getFingerId } from "../finger-print";

export type Token = {
  access_token: string;
  refresh_token: string;
};

export class TokenStorage {
  public static readonly LOCAL_STORAGE_TOKEN = "token";
  public static readonly LOCAL_STORAGE_REFRESH_TOKEN = "refresh_token";

  static getNewToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      getFingerId().then((result) => {
        httpClient
          .post(`auth/refreshtoken`, {
            refreshToken: this.getRefreshToken(),
            fingerPrint: result.visitorId,
          })
          .then((response) => {
            this.storeToken(response.data.accessToken);
            this.storeRefreshToken(response.data.refreshToken);
            resolve(response.data.accessToken);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  public static storeToken(token: string): void {
    localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
  }

  public static storeRefreshToken(refreshToken: string): void {
    localStorage.setItem(
      TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN,
      refreshToken,
    );
  }

  public static clear(): void {
    localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  public static getToken(): string | null {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
  }

  public static getBarear(): string | null {
    return `Bearer ${TokenStorage.getToken()}`;
  }

  private static getRefreshToken(): string | null {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
  }
}
