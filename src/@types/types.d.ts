type ResumeInfosData = {
  fullName: string;
  headline: string;
  email: string;
  website: string;
  phone: string;
  location: string;
}

type ResumeImageData = {
  url: string;
  visible: boolean;
}

type ResumeContentData = {
  image: ResumeImageData;
  infos: ResumeInfosData;
}

type ResumeData = {
  content: ResumeContentData;
  // structure: ResumeStructureData;
}