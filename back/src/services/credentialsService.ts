import ICredential from '../interfaces/ICredential';

const credentials: ICredential[] = [];

let id: number = 1;

export default {
  async createCredential(username: string, password: string): Promise<number> {
    const newCredential: ICredential = {
      id,
      username,
      password
    };

    credentials.push(newCredential);
    id++;
    
    return newCredential.id;
  },
  async validateCredential(username: string, password: string): Promise<number | null> {
    const matchingCredential = credentials.find(credential => credential.username === username);

    if (matchingCredential && matchingCredential.password === password) {
      return matchingCredential.id;
    }

    return null;
  }
};