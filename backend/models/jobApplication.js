import { Schema, model } from 'mongoose';

const jobApplicationSchema = new Schema({
  // There is an attibute _id auto generated stands for job_id

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  salary: {
    type: String,
  },
  website: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Rejected', 'Not Applied', 'Offered'],
    required: true,
  },
});

export default JobApplication = model('jobapplication', jobApplicationSchema);
