import mongoose from "mongoose";

const PlannificationSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type',
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ['Job', 'Challenge'],
      },
})

const Plannification = mongoose.model("Plannification",PlannificationSchema);
export default Plannification;