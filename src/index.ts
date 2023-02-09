import app from "./app";
import config from "./config";

app.listen(config.PORT, () => {
  console.log(`Listening on Port ${config.PORT}`);
});
