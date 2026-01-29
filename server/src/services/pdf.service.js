import pdfParse from "pdf-parse";

export const parsePDF = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};