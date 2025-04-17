
interface DayAssets {
  sound: string;
  image: string;
}

const dayAssets: Record<string, DayAssets> = {
  monday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-01.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDEubXAzIiwiaWF0IjoxNzQ0OTI4MDUxLCJleHAiOjE3NDU1MzI4NTF9.r2adn2e0oTOm1OwOevXiTCfx0tUeBI-uP9obqm5ftfA",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/monday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9tb25kYXkucG5nIiwiaWF0IjoxNzQ0OTI4MTI4LCJleHAiOjE3NDU1MzI5Mjh9.oqIwX5FG-76wXH31A6AoOLxtfcDV0-UprSOVl1-g_O8"
  },
  tuesday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-02.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDIubXAzIiwiaWF0IjoxNzQ0OTI4MTUxLCJleHAiOjE3NDU1MzI5NTF9.ljibREHY6sVRbubSeQC6tyLZ2NuvVkcvhWfCN_tRAbc",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/tuesday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci90dWVzZGF5LnBuZyIsImlhdCI6MTc0NDkyODE2OSwiZXhwIjoxNzQ1NTMyOTY5fQ.-4huPpPv7wEs9bDgd3DUavvyjr5iLge5qSOop7BMPDU"
  },
  wednesday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-03.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDMubXAzIiwiaWF0IjoxNzQ0OTI4MTg2LCJleHAiOjE3NDU1MzI5ODZ9.tmk7bITAWh9JkZo9WcmC-1zuyHcHm7jhoUNhcM9b_mo",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/wednesday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci93ZWRuZXNkYXkucG5nIiwiaWF0IjoxNzQ0OTI4MjA2LCJleHAiOjE3NDU1MzMwMDZ9.nQp_Nso6e_7S4-7nHEq9P45PbFFumrNQIMFz92YKrug"
  },
  thursday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-04.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDQubXAzIiwiaWF0IjoxNzQ0OTI4MjI3LCJleHAiOjE3NDU1MzMwMjd9.JCnFrP_vkvcVi3zItgi5-7xrY-29OFt2K256JfZb7o4",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/thursday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci90aHVyc2RheS5wbmciLCJpYXQiOjE3NDQ5MjgyNDAsImV4cCI6MTc0NTUzMzA0MH0.GWST5hNECX0Ghdduw6B4AVhDmoVitqp5HweB53Q9w18"
  },
  friday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-05.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDUubXAzIiwiaWF0IjoxNzQ0OTI4MjU5LCJleHAiOjE3NDU1MzMwNTl9.6w9ult0QCIyXDq7Z04EiRuKF0izSVcs9gMWGNRztYP8",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/friday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9mcmlkYXkucG5nIiwiaWF0IjoxNzQ0OTI4Mjc0LCJleHAiOjE3NDU1MzMwNzR9.eG7EyXFAGhBwTQchhukD4iA7JT3oQzIPxBabFSgXBZ0"
  },
  saturday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-06.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDYubXAzIiwiaWF0IjoxNzQ0OTI4MjkwLCJleHAiOjE3NDU1MzMwOTB9.cT9B1lP3VXWc7D1yWtW55D67wxf8VPT-GJiwAn7VZSo",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/saturday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9zYXR1cmRheS5wbmciLCJpYXQiOjE3NDQ5MjgzMDUsImV4cCI6MTc0NTUzMzEwNX0.Qkpwu4pqnc5mS549y-iyw5gXH4M8bg9Jx_5544RFIBQ"
  },
  sunday: {
    sound: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/S1-01-07.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvUzEtMDEtMDcubXAzIiwiaWF0IjoxNzQ0OTI4MzE5LCJleHAiOjE3NDU1MzMxMTl9.O_uQPXrpLd7GLp44tlwnPzMEe1rYPCWuo-Q1WQD7SsY",
    image: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/sunday.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9zdW5kYXkucG5nIiwiaWF0IjoxNzQ0OTI4MzMxLCJleHAiOjE3NDU1MzMxMzF9.WwIUUtQGTiN_Op_Fl-Ncrrc6EyVv83kcmKL4fMFL-lE"
  }
};

export const getCurrentDayAssets = (): DayAssets => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[new Date().getDay()];
  return dayAssets[currentDay];
};
