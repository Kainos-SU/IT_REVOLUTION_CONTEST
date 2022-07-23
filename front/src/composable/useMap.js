import { reactive, onMounted, watch, nextTick } from "vue";
import Leaflet from "leaflet";

const useMap = (
  rootElement,
  arrayOfDots,
  updateDots,
  getPopupContent,
  addNewDot
) => {
  const text = reactive({
    isEmpty: true,
    name: "",
    address: "",
    state: "",
    img: ""
  });

  onMounted(() => {
    console.log("mounted", rootElement.value);
    const map = Leaflet.map(rootElement.value).setView(
      { lat: 49.235898475408604, lng: 28.455319404602054 },
      15
    );

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const featureLayer = Leaflet.layerGroup().addTo(map);

    const update = () => {
      console.log(map.getBounds());
      const { _northEast: topRight, _southWest: bottomLeft } = map.getBounds();
      updateDots(topRight, bottomLeft);
    };

    update();

    map.on("moveend", update);

    map.on("click", (event) => {
      console.log(event.latlng);
      const { lat, lng } = event.latlng;
      text.isEmpty = true;
      text.lan = lat;
      text.lng = lng;
      const popup = Leaflet.popup();
      nextTick(async () => {
        const content = await getPopupContent();
        content.style.display = "flex";
        content
          .querySelector("button")
          .addEventListener("click", () => addNewDot(lat, lng));
        popup.setLatLng(event.latlng).setContent(content).openOn(map);
      });
    });

    watch(
      arrayOfDots,
      (current) => {
        featureLayer.eachLayer((layer) => featureLayer.removeLayer(layer));
        current.forEach((tree) => {
          const circle = Leaflet.circle(
            [tree.coordinatesX, tree.coordinatesY],
            {
              color: "blue",
              fillColor: "blue",
              fillOpacity: 0.5,
              bubblingMouseEvents: false,
              radius: tree.crownRadius,
            }
          );
          circle.on("click", (event) => {
            console.log(tree);
            text.isEmpty = false;
            text.name = tree._id;
            text.address = tree.addres;
            text.state = tree.state;
            text.img = tree.imgSrc;
            const popup = Leaflet.popup();
            nextTick(async () => {
              const content = await getPopupContent();
              content.style.display = "flex";
              popup.setLatLng(event.latlng).setContent(content).openOn(map);
            });
          });
          circle.addTo(featureLayer);
        });
      },
      { immediate: true }
    );
  });

  return text;
};

export default useMap;
