import { Schema, model, models } from 'mongoose';

const RaiseSchema = new Schema(
  {
    title: {
      type: String,
    },
    date: {
      type: Date,
    },
    region: {
      type: String,
    },
    link: {
      type: String,
    },
    content: {
      type: String,
    },
    website: {
      type: String,
    },
    startup_name: {
      type: String,
    },
    investors: {
      type: Array,
    },
    most_similar_tag: {
      type: String,
    },
    category: {
      type: String,
    },
    company_description: {
      type: String,
    },
    differentiation: {
      type: String,
    },
    raised: {
      type: String,
    },
    raise: {
      type: String,
    },
    Predicted_Categories: {
      type: Array,
    },
    Predicted_Groups: {
      type: Array,
    },
    raise_num: {
      type: String,
    },
    raise_date: {
      type: String,
    },
    raised_digits: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Raise = models.Raise || model('Raise', RaiseSchema);

export default Raise;
