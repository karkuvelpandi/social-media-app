import { RegisterFormData } from "../types/auth.types";
import { UserProfileInterface } from "../types/user.types";

export function newUser(
  userId: string,
  formData: RegisterFormData
): UserProfileInterface {
  const cover1 =
    "https://firebasestorage.googleapis.com/v0/b/dude-media.appspot.com/o/default%2FdefaultCover2.jpg?alt=media&token=63e7483e-c56f-4bda-bcd9-008220df0cce";
  const cover2 =
    "https://firebasestorage.googleapis.com/v0/b/dude-media.appspot.com/o/default%2FdefaultCover.jpg?alt=media&token=8ce352c1-d052-4158-84b0-71c831c43ad1";
  const cover3 =
    "https://firebasestorage.googleapis.com/v0/b/dude-media.appspot.com/o/default%2Fcover3.jpg?alt=media&token=ee14098a-8142-4469-9454-db637158d6fb";
  const cover4 =
    "https://firebasestorage.googleapis.com/v0/b/dude-media.appspot.com/o/default%2Fcover4.jpg?alt=media&token=2a7271cb-511c-4987-b3cd-0a4ac2dda45b";
  const cover5 =
    "https://firebasestorage.googleapis.com/v0/b/dude-media.appspot.com/o/default%2Fcover5.jpg?alt=media&token=20724f3e-0b6b-4cb5-bd5b-cf20270dbdce";
  const profile =
    "https://firebasestorage.googleapis.com/v0/b/dude-media.appspot.com/o/default%2FdefaultProfile.jpg?alt=media&token=e9770621-fd4f-42f7-84fa-075abc60365e";

  const coverImageArray = [cover1, cover2, cover3, cover4, cover5];
  const random = (array: string[]) => {
    const randomNumber = Math.floor(Math.random() * 5);
    return array[randomNumber];
  };
  return {
    id: userId,
    fullName: formData.fullName,
    username: formData.username,
    email: formData.email,
    posts: [],
    followers: [],
    userImageUrl: profile,
    coverImageUrl: random(coverImageArray),
    socialMediaLinks: [],
    location: {},
    chats: [],
    settings: {},
    createdAt: new Date().getTime(),
  };
}
