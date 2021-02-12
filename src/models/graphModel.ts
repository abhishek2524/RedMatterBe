const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GraphSchema = mongoose.Schema({
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
        unique: true
    },
    graphs: [{
        fileIds: [],
        paramX: {
            type: Number,
            required: true
        }, 
        paramY: {
            type: Number
        },
        paramXName: {
            type: String,
            required: true
        }, 
        paramYName: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        xScale: {
            type: String,
            required: true
        },
        yScale: {
            type: String
        },
        isDotPlot: {
            type: Boolean,
            required: true
        },
        selectedGate: {
            type: String,
            required: true
        },
        graphName: {
            type: String,
            required: true
        },
        index: {type: Number}
    }]
}, {
  usePushEach: true
});


// Graph.methods.getNextIndex = function() {
//     var index = 1;
//     if(this.graphs && this.graphs.length > 0){
//         index = this.graphs[this.graphs.length - 1].index + 1;
//     }

//     return index;
// };

// Graph.methods.getNewGraphName = function() {

//     var index = this.getNextIndex();

//     return 'graph' + index;  
// };

const Graph =mongoose.model('Graph', GraphSchema);
module.exports = Graph;

