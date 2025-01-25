export const features = [
  {
    title: "Quick poll creation",
  },
  {
    title: "TIme based voting",
  },
  {
    title: "One time voting",
  },
  {
    title: "Easy result compilation",
  },
];

export const BACKEND_URL=  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://veo-six.vercel.app/"