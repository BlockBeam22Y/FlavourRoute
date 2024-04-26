interface IReservation {
  time: Date,
  purpose: string,
  isActive: boolean
}

interface IUser {
  username: string,
  email: string,
  notificationsEnabled: boolean,
  reservations: IReservation[]
}

interface ICredentials {
  email: string,
  password: string,
  user: IUser
}

const credentialsSet: ICredentials[] = [];

function signup(username: string, email: string, password: string, notificationsEnabled: boolean = false) {
  const newUser: IUser = {
    username,
    email,
    notificationsEnabled,
    reservations: []
  };
  
  const userCredentials: ICredentials = {
    email,
    password,
    user: newUser
  };

  credentialsSet.push(userCredentials);
  console.log(`Welcome, ${newUser.username}! Login to continue`);
}

function login(email: string, password: string): IUser | null {
  for (const credentials of credentialsSet) {
    if (credentials.email === email && credentials.password === password) {
      const loggedUser = credentials.user;
      console.log(`Logged in as ${loggedUser.username}`);
      return loggedUser;
    }
  }

  console.log('Email or password invalid');
  return null;
}

function enableNotifications(user: IUser | null) {
  if (!user) {
    console.log('You must be logged in to perform this action');
    return;
  }

  user.notificationsEnabled = true;
  console.log('Notifications enabled');
}

function disableNotifications(user: IUser | null) {
  if (!user) {
    console.log('You must be logged in to perform this action');
    return;
  }

  user.notificationsEnabled = false;
  console.log('Notifications disabled');
}

function makeReservation(user: IUser | null, purpose: string, delayDays: number = 1): void {
  if (!user) {
    console.log('You must be logged in to perform this action');
    return;
  }

  const newReservation: IReservation = {
    time: new Date(Date.now() + 86400 * 1000 * delayDays),
    purpose,
    isActive: true
  };

  user.reservations.push(newReservation);
  console.log(`Reservation made for ${newReservation.time.toLocaleDateString()}: ${purpose}`);

  if (user.notificationsEnabled) {
    console.log(`Confirmation sent to ${user.email}`);
  }
}

function cancelReservation(user: IUser | null, purpose: string): void {
  if (!user) {
    console.log('You must be logged in to perform this action');
    return;
  }

  for (let i = 0; i < user.reservations.length; i++) {
    const reservation: IReservation = user.reservations[i];
    
    if (reservation.purpose !== purpose) continue;

    if (reservation.isActive) {
      reservation.isActive = false;
      console.log(`Reservation for ${reservation.time.toLocaleDateString()} cancelled: ${purpose}`);

      if (user.notificationsEnabled) {
        console.log(`Confirmation sent to ${user.email}`);
      }
    } else {
      console.log('This reservation is already cancelled');
    }

    return;
  }

  console.log(`Couldn't find reservation "${purpose}"`);
}

let loggedUser: IUser | null;

signup('BlockBeam22Y', 'rodrigofc1910@gmail.com', 'password');
loggedUser = login('rodrigofc1910@gmail.com', '1234');
makeReservation(loggedUser, 'Cena de aniversario', 7);
loggedUser = login('rodrigofc1910@gmail.com', 'password');
makeReservation(loggedUser, 'Cena familiar', 4);
enableNotifications(loggedUser);
makeReservation(loggedUser, 'Almuerzo de negocios');
makeReservation(loggedUser, 'Cena de aniversario', 7);
cancelReservation(loggedUser, 'Cena familiar');
cancelReservation(loggedUser, 'Cena familiar');
disableNotifications(loggedUser);
cancelReservation(loggedUser, 'Almuerzo de negocios');