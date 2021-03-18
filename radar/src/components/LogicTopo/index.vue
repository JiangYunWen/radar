<template>
  <el-col :span="24">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <h2>逻辑拓扑视图</h2>
          </div>
          <div>
            <span>机箱选择：</span>
            <el-select v-model="serverValue" placeholder="请选择机箱" @change="getData()">
              <el-option
                v-for="tree in items"
                :key="tree.deviceId"
                :label="tree.name"
                :value="tree.deviceId"
                >{{ tree.name }}</el-option
              >
            </el-select>
          </div>
          <div
            id="myDiagramDiv"
            style="
              border: 1px solid black;
              width: 99%;
              height: 700px;
              position: relative;
              -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
            "
          ></div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import { logicData1, logicData2 } from "../../api/index";
export default {
  data() {
    return {
      configData: [],
      progressData: [],
      nodeDataArray: [],
      linkDataArray: [],
      items: [],
      serverValue: 267,
      myDiagram: "",
    };
  },
  methods: {
    gettree() {
      this.$axios({
        method: "get",
        url: "/sys/app/appdevices",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            // this.treedata = res.data.data;
            console.log("res.data.data", res.data.data);
            // for (var i = 0; i < res.data.data.length; i++) {
            this.items = res.data.data;
            // }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    getData() {
      switch (this.serverValue) {
        case 267: //信号处理机箱
          this.getData1();
          break;
        case 268: //信号处理机箱
          this.getData1();
          break;
        case 269: //数据处理机箱
          this.getData2();
          break;
        case 270: //综合显控机箱
          this.getData2();
          break;
        default:
          this.getData1();
          break;
      }
    },
    getData1() {
      logicData1(this.query).then((res) => {
        //连线
        var links = [];
        for (var l = 0; l < res.SoltsLinks.length; l++) {
          var link = {};
          link["from"] = res.SoltsLinks[l].from;
          link["to"] = res.SoltsLinks[l].to;
          link["category"] = res.SoltsLinks[l].category;
          link["fromSpot"] = res.SoltsLinks[l].fromSpot;
          link["toSpot"] = res.SoltsLinks[l].toSpot;
          links.push(link);
        }
        this.linkDataArray = links;
        console.log("this.linkDataArray", this.linkDataArray);

        //节点
        var solts = [];
        for (var i = 0; i < res.OnlineSolts.length; i++) {
          //首先第一个大组
          var group1 = {};
          group1["isGroup"] = true;
          group1["key"] = res.OnlineSolts[i].key;
          group1["subtype"] = res.OnlineSolts[i].subtype;
          group1["category"] = res.OnlineSolts[i].category;
          group1["size"] = res.OnlineSolts[i].size;
          group1["text"] = res.OnlineSolts[i].text;
          solts.push(group1);

          console.log("Chips", res.OnlineSolts[i].Chips.length);
          var Chips = res.OnlineSolts[i].Chips.length;

          //第二层组
          if (Chips > 0) {
            for (var j = 0; j < Chips; j++) {
              var Chips2 = {};
              Chips2["key"] = res.OnlineSolts[i].Chips[j].key;
              Chips2["group"] = res.OnlineSolts[i].Chips[j].group;
              Chips2["category"] = res.OnlineSolts[i].Chips[j].category;
              Chips2["loc"] = res.OnlineSolts[i].Chips[j].loc;
              Chips2["text"] = res.OnlineSolts[i].Chips[j].text;

              solts.push(Chips2);
            }
          }
        }

        this.nodeDataArray = solts;
        this.setTopo();
      });
    },

    getData2() {
      logicData2(this.query).then((res) => {
        //连线
        var links = [];
        for (var l = 0; l < res.SoltsLinks.length; l++) {
          var link = {};
          link["from"] = res.SoltsLinks[l].from;
          link["to"] = res.SoltsLinks[l].to;
          link["category"] = res.SoltsLinks[l].category;
          link["fromSpot"] = res.SoltsLinks[l].fromSpot;
          link["toSpot"] = res.SoltsLinks[l].toSpot;
          links.push(link);
        }
        this.linkDataArray = links;
        console.log("this.linkDataArray", this.linkDataArray);

        //节点
        var solts = [];
        for (var i = 0; i < res.OnlineSolts.length; i++) {
          //首先第一个大组
          var group1 = {};
          group1["isGroup"] = true;
          group1["key"] = res.OnlineSolts[i].key;
          group1["subtype"] = res.OnlineSolts[i].subtype;
          group1["category"] = res.OnlineSolts[i].category;
          group1["size"] = res.OnlineSolts[i].size;
          group1["text"] = res.OnlineSolts[i].text;
          solts.push(group1);

          console.log("Chips", res.OnlineSolts[i].Chips.length);
          var Chips = res.OnlineSolts[i].Chips.length;

          //第二层组
          if (Chips > 0) {
            for (var j = 0; j < Chips; j++) {
              var Chips2 = {};
              Chips2["key"] = res.OnlineSolts[i].Chips[j].key;
              Chips2["group"] = res.OnlineSolts[i].Chips[j].group;
              Chips2["category"] = res.OnlineSolts[i].Chips[j].category;
              Chips2["loc"] = res.OnlineSolts[i].Chips[j].loc;
              Chips2["text"] = res.OnlineSolts[i].Chips[j].text;

              solts.push(Chips2);
            }
          }
        }

        this.nodeDataArray = solts;
        this.setTopo();
      });
    },
    setTopo() {
      if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make; // for conciseness in defining templates
      if (this.myDiagram != "") {
        this.myDiagram.div = null;
      }
      this.myDiagram = $(
        go.Diagram,
        "myDiagramDiv", // Diagram refers to its DIV HTML element by id
        {
          maxSelectionCount: 1, // no more than 1 element can be selected at a time
          allowHorizontalScroll: true, // disallow scrolling or panning
          allowVerticalScroll: true,
          allowZoom: true, // disallow zooming
          allowMove: false,
          "animationManager.isEnabled": false,
          "undoManager.isEnabled": false,
          scale: 0.8, //初始视图大小比例
          layout: $(go.GridLayout, {
            comparer: go.GridLayout.smartComparer,
          }),
        }
      );
      // the background Part showing the fixed bounds of the diagram contents
      //   myDiagram.add(
      //     $(go.Part,
      //       { layerName: "Horizontal", position: myDiagram.fixedBounds.position },
      //       $(go.Shape, { fill: "oldlace", strokeWidth: 0, desiredSize: myDiagram.fixedBounds.size })
      //     ));

      // this function is the Node.dragComputation, to limit the movement of the parts
      // use GRIDPT instead of PT if DraggingTool.isGridSnapEnabled and movement should snap to grid
      function stayInFixedArea(part, pt, gridpt) {
        var diagram = part.diagram;
        if (diagram === null) return pt;
        // compute the document area without padding
        var v = diagram.documentBounds.copy();
        v.subtractMargin(diagram.padding);
        // get the bounds of the part being dragged
        var b = part.actualBounds;
        var loc = part.location;
        // now limit the location appropriately
        var x = Math.max(v.x, Math.min(pt.x, v.right - b.width)) + (loc.x - b.x);
        var y = Math.max(v.y, Math.min(pt.y, v.bottom - b.height)) + (loc.y - b.y);
        return new go.Point(x, y);
      }

      //普通块
      this.myDiagram.nodeTemplateMap.add(
        "Rectangle",
        $(
          go.Node,
          "Auto",
          {
            fromSpot: go.Spot.TopSide, // coming out from right side
            toSpot: go.Spot.TopSide,
          }, // going into at left side
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          $(go.Shape, "Rectangle", {
            fill: "#FAFAD2",
            width: 97,
            height: 60,
          }),
          $(
            go.TextBlock,
            new go.Binding("text", "text"),
            {
              width: 55,
              textAlign: "center",
              wrap: go.TextBlock.WrapDesiredSize,
            },
            {
              margin: 5,
            }
          )
        )
      );
      //数据模块blue
      this.myDiagram.nodeTemplateMap.add(
        "Rectangleblue",
        $(
          go.Node,
          "Auto",
          {
            fromSpot: go.Spot.TopSide, // coming out from right side
            toSpot: go.Spot.TopSide,
          }, // going into at left side
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          $(go.Shape, "Rectangle", {
            fill: "	#436EEE",
            width: 97,
            height: 60,
          }),
          $(
            go.TextBlock,
            new go.Binding("text", "text"),
            {
              width: 47,
              textAlign: "center",
              wrap: go.TextBlock.WrapDesiredSize,
            },
            {
              margin: 5,
            }
          )
        )
      );
      //数据模块red
      this.myDiagram.nodeTemplateMap.add(
        "Rectanglered",
        $(
          go.Node,
          "Auto",
          {
            fromSpot: go.Spot.BottomSide, // coming out from right side
            toSpot: go.Spot.BottomSide,
          }, // going into at left side
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          $(go.Shape, "Rectangle", {
            fill: "red",
            width: 97,
            height: 60,
          }),
          $(
            go.TextBlock,
            new go.Binding("text", "text"),
            {
              width: 47,
              textAlign: "center",
              wrap: go.TextBlock.WrapDesiredSize,
            },
            {
              margin: 5,
            }
          )
        )
      );

      //数据模块purple
      this.myDiagram.nodeTemplateMap.add(
        "Rectanglepurple",
        $(
          go.Node,
          "Auto",
          {
            fromSpot: go.Spot.TopSide, // coming out from right side
            toSpot: go.Spot.TopSide,
          }, // going into at left side
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          $(go.Shape, "Rectangle", {
            fill: "#9A32CD",
            width: 97,
            height: 60,
          }),
          $(
            go.TextBlock,
            new go.Binding("text", "text"),
            {
              width: 47,
              textAlign: "center",
              wrap: go.TextBlock.WrapDesiredSize,
            },
            {
              margin: 5,
            }
          )
        )
      );

      //AUX pink
      this.myDiagram.nodeTemplateMap.add(
        "circlepink",
        $(
          go.Node,
          "Auto",
          {
            fromSpot: go.Spot.TopSide, // coming out from right side
            toSpot: go.Spot.TopSide,
          }, // going into at left side
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          $(go.Shape, "Circle", {
            fill: "pink",
            width: 40,
            height: 60,
            portId: "",
          }),
          $(
            go.TextBlock,
            new go.Binding("text", "text"),
            {
              width: 60,
              textAlign: "center",
              wrap: go.TextBlock.WrapDesiredSize,
            },
            {
              margin: 5,
            }
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        "circleblue",
        $(
          go.Node,
          "Auto",
          {
            fromSpot: go.Spot.TopSide, // coming out from right side
            toSpot: go.Spot.TopSide,
          }, // going into at left side
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          $(go.Shape, "Circle", {
            fill: "blue",
            width: 40,
            height: 60,
            portId: "",
          }),
          $(
            go.TextBlock,
            new go.Binding("text", "text"),
            {
              width: 60,
              textAlign: "center",
              wrap: go.TextBlock.WrapDesiredSize,
            },
            {
              margin: 5,
            }
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        "circlered",
        $(
          go.Node,
          "Auto",
          {
            fromSpot: go.Spot.TopSide, // coming out from right side
            toSpot: go.Spot.TopSide,
          }, // going into at left side
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          $(go.Shape, "Circle", {
            fill: "red",
            width: 40,
            height: 60,
            portId: "",
          }),
          $(
            go.TextBlock,
            new go.Binding("text", "text"),
            {
              width: 60,
              textAlign: "center",
              wrap: go.TextBlock.WrapDesiredSize,
            },
            {
              margin: 5,
            }
          )
        )
      );

      //多个组模板定义,"OfGroup1"为组模板的分类,在json用category指定组使用的模板
      this.myDiagram.groupTemplateMap.add(
        "OfGroup1",
        $(
          go.Group,
          "Auto",
          {},
          // declare the Group.layout:
          {
            dragComputation: stayInFixedArea,
          },
          new go.Binding("desiredSize", "size", go.Size.parse),
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          $(
            go.Shape,
            "Rectangle", // surrounds everything
            {
              parameter1: 10,
              fill: "rgba(128,128,128,0.33)",
            }
          ),
          $(
            go.Panel,
            "Vertical",
            {
              width: 400,
              height: 830,
            }, // position header above the subgraph
            $(
              go.TextBlock, // group title near top, next to button
              new go.Binding("text", "text"),
              {
                font: "Bold 12pt Sans-Serif",
                textAlign: "center",
                width: 47,
                wrap: go.TextBlock.WrapDesiredSize,
              }
            )
            // $(go.Placeholder, // represents area for all member parts
            // )
          )
        )
      );

      //蓝色线段
      this.myDiagram.linkTemplateMap.add(
        "Orthogonalblue",
        // myDiagram.linkTemplate =
        $(
          go.Link,
          new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
          new go.Binding("toSpot", "toSpot", go.Spot.parse),
          {
            selectable: false, // links cannot be selected by the user
            routing: go.Link.Orthogonal,
            layerName: "Background", // don't cross in front of any nodes
          },
          $(
            go.Shape, // this shape only shows when it isHighlighted
            {
              isPanelMain: true,
              stroke: null,
              strokeWidth: 5,
            },
            new go.Binding("stroke", "isHighlighted", function (h) {
              return h ? "#436EEE" : null;
            }).ofObject()
          ),
          $(
            go.Shape,
            // mark each Shape to get the link geometry with isPanelMain: true
            {
              isPanelMain: true,
              stroke: "#436EEE",
              strokeWidth: 2,
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, {
            toArrow: "",
          })
        )
      );

      //红色线段
      this.myDiagram.linkTemplateMap.add(
        "Orthogonalred",
        // myDiagram.linkTemplate =
        $(
          go.Link,
          new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
          new go.Binding("toSpot", "toSpot", go.Spot.parse),
          {
            selectable: false, // links cannot be selected by the user
            routing: go.Link.Orthogonal,
            layerName: "Background", // don't cross in front of any nodes
          },
          $(
            go.Shape, // this shape only shows when it isHighlighted
            {
              isPanelMain: true,
              stroke: null,
              strokeWidth: 5,
            },
            new go.Binding("stroke", "isHighlighted", function (h) {
              return h ? "red" : null;
            }).ofObject()
          ),
          $(
            go.Shape,
            // mark each Shape to get the link geometry with isPanelMain: true
            {
              isPanelMain: true,
              stroke: "red",
              strokeWidth: 2,
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, {
            toArrow: "",
          })
        )
      );

      //紫色线段
      this.myDiagram.linkTemplateMap.add(
        "Orthogonalpurple",
        // myDiagram.linkTemplate =
        $(
          go.Link,
          new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
          new go.Binding("toSpot", "toSpot", go.Spot.parse),
          {
            selectable: false, // links cannot be selected by the user
            routing: go.Link.Orthogonal,
            layerName: "Background", // don't cross in front of any nodes
          },
          $(
            go.Shape, // this shape only shows when it isHighlighted
            {
              isPanelMain: true,
              stroke: null,
              strokeWidth: 5,
            },
            new go.Binding("stroke", "isHighlighted", function (h) {
              return h ? "#8E388E" : null;
            }).ofObject()
          ),
          $(
            go.Shape,
            // mark each Shape to get the link geometry with isPanelMain: true
            {
              isPanelMain: true,
              stroke: "#8E388E",
              strokeWidth: 2,
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, {
            toArrow: "",
          })
        )
      );

      //粉色线段
      this.myDiagram.linkTemplateMap.add(
        "Orthogonalpink",
        // myDiagram.linkTemplate =
        $(
          go.Link,
          new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
          new go.Binding("toSpot", "toSpot", go.Spot.parse),
          {
            selectable: false, // links cannot be selected by the user
            routing: go.Link.Normal,
            layerName: "Background", // don't cross in front of any nodes
          },
          $(
            go.Shape, // this shape only shows when it isHighlighted
            {
              isPanelMain: true,
              stroke: null,
              strokeWidth: 5,
            },
            new go.Binding("stroke", "isHighlighted", function (h) {
              return h ? "#FF6347" : null;
            }).ofObject()
          ),
          $(
            go.Shape,
            // mark each Shape to get the link geometry with isPanelMain: true
            {
              isPanelMain: true,
              stroke: "#FF6347",
              strokeWidth: 2,
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, {
            toArrow: "",
          })
        )
      );

      //IPMB
      this.myDiagram.linkTemplateMap.add(
        "OrthogonalIPMB",
        // myDiagram.linkTemplate =
        $(
          go.Link,
          new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
          new go.Binding("toSpot", "toSpot", go.Spot.parse),
          {
            selectable: false, // links cannot be selected by the user
            routing: go.Link.Orthogonal,
            layerName: "Background", // don't cross in front of any nodes
          },
          $(
            go.Shape, // this shape only shows when it isHighlighted
            {
              isPanelMain: true,
              stroke: null,
              strokeWidth: 5,
            },
            new go.Binding("stroke", "isHighlighted", function (h) {
              return h ? "#FFA500" : null;
            }).ofObject()
          ),
          $(
            go.Shape,
            // mark each Shape to get the link geometry with isPanelMain: true
            {
              isPanelMain: true,
              stroke: "#FFA500",
              strokeWidth: 2,
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, {
            toArrow: "",
          })
        )
      );
      // var nodeDataArray=[];
      // var linkDataArray = [];

      // console.log('nodeDataArray', nodeDataArray);
      console.log("this.nodeDataArray", this.nodeDataArray);
      this.myDiagram.model = new go.GraphLinksModel(
        this.nodeDataArray,
        this.linkDataArray
      );
    },

    getconfig() {
      this.$axios({
        method: "post",
        url: "/sys/device/getconfig",
        data: JSON.stringify({
          deviceId: this.$route.params.menuId,
          key: "bhost_netconfig",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.configData = res.data.data.config.data;
          } else {
            this.$message.error(res.data.msg);
            clearInterval(this.cpu);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
          clearInterval(this.cpu);
        });
    },
    getProgressData() {
      this.$axios({
        method: "post",
        url: "/sys/device/status",
        data: JSON.stringify({
          id: this.$route.params.menuId,
          isSub: true,
          keys: ["bht_host_sysprocess"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.progressData = res.data.data.status.bht_host_sysprocess.data;
          } else {
            this.$message.error(res.data.msg);
            clearInterval(this.cpu);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
          clearInterval(this.cpu);
        });
    },
  },
  mounted: function () {
    // this.getProgressData();
    // this.getconfig();
    this.gettree();
    this.getData();
  },
};
</script>

<style scoped>
#myDiagramDiv {
  background-color: #f8f8f8;
  border: 1px solid #aaa;
}
</style>
