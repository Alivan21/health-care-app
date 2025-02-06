import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export function createFunnelChart(containerId: string) {
  const root = am5.Root.new(containerId);

  root.setThemes([am5themes_Animated.new(root)]);

  const chart = root.container.children.push(
    am5percent.SlicedChart.new(root, {
      layout: root.verticalLayout,
    })
  );

  const series = chart.series.push(
    am5percent.FunnelSeries.new(root, {
      alignLabels: false,
      orientation: "horizontal",
      valueField: "value",
      categoryField: "category",
      bottomRatio: 1,
      colors: am5.ColorSet.new(root, {
        colors: [
          am5.color(0x6893ff),
          am5.color(0x9cbeff),
          am5.color(0xc5d9ff),
          am5.color(0xe5eeff),
        ],
        step: 1,
      }),
    })
  );

  series.data.setAll([
    { value: 10, category: "Received" },
    { value: 9, category: "Reviewed" },
    { value: 6, category: "Submitted" },
    { value: 5, category: "Completed" },
  ]);

  series.labels.template.setAll({
    fontSize: 10,
    fill: am5.color(0x550000),
    text: "{category}",
  });

  series.links.template.setAll({
    height: 0,
    width: 0,
  });

  series.slices.template.set(
    "tooltipText",
    "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})"
  );

  series
    .appear(1000, 100)
    .then(() => {})
    .catch(err => console.error(err));

  const legend = chart.children.unshift(
    am5.Legend.new(root, {
      nameField: "categoryX",
      centerX: am5.percent(50),
      x: am5.p50,
      marginBottom: 15,
      templateField: "category",
    })
  );

  legend.data.setAll(series.dataItems);

  legend.valueLabels.template.set("forceHidden", true);

  legend.markers.template.setAll({
    width: 4,
    height: 8,
  });

  legend.labels.template.setAll({
    fontSize: 12,
    fontWeight: "400",
  });

  return root;
}
