import { saveResume, getResumesByUser } from '../models/resume.model.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const userId = req.user.id;
    const { filename, content } = req.body;

    if (!filename || !content) {
      return res.status(400).json({
        message: "Filename and content are required"
      });
    }

    const resumeId = await saveResume(userId, filename, content);

    return res.status(201).json({
      message: "Resume saved successfully",
      resumeId
    });

  } catch (error) {
    res.status(500).json({
      message: "Upload failed"
    });
  }
};

export const getResumes = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const userId = req.user.id;
    const resumes = await getResumesByUser(userId);

    return res.json(resumes);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get resumes"
    });
  }
};
