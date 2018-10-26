/* eslint-disable no-console */

const {existsSync} = require("fs");
const path = require("path");

const Ajv = require("ajv");
const checkLinks = require("check-links");
const glob = require("glob");
const YAML = require("yamljs");

const experimentSchema = require("./schema");

const ajv = new Ajv({allErrors: true});

const staticImagePath = (src) => src.replace("/static/", "./frontend/src/");

exports.lintExperiments = (dir) => {
  if (!dir) {
    console.error("Please specify a path to the ./content-src/experiments/ YAML files");
    process.exit(1);
  }
  glob(dir, async (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (files.length === 0) {
      console.error(`No files found matching "${dir}"`);
      process.exit(1);
    }
    for (const file of files) {
      await exports.lintExperiment(file);
    }
    process.exit();
  });
};

exports.lintExperiment = async (p) => {
  const experiment = YAML.load(p);

  const base = path.resolve(p, "../../..");

  console.log(`\n${experiment.title}`);

  const valid = ajv.validate(experimentSchema, experiment);
  if (!valid) {
    console.log(JSON.stringify(ajv.errors, null, 2));
    console.log(experiment);
  }

  console.log("  checking images:");
  exports.lintImages(experiment, base);

  console.log("  checking urls:");
  await exports.lintUrls(experiment);
};

exports.getImages = (experiment) =>{
  const arr = [
    experiment.image_facebook,
    experiment.image_twitter,
    experiment.thumbnail
  ];
  experiment.contributors.forEach(({avatar}) => arr.push(avatar));
  experiment.details.forEach(({image}) => arr.push(image));

  if (experiment.tour_steps) {
    experiment.tour_steps.forEach(({image}) => arr.push(image));
  }
  return arr.filter(item => item);
};

exports.getUrls = (experiment) => {
  const arr = [
    experiment.bug_report_url,
    experiment.changelog_url,
    experiment.contribute_url,
    experiment.discourse_url,
    experiment.graduation_url,
    experiment.privacy_notice_url,
    experiment.video_url,
    experiment.xpi_url
  ];

  if (experiment.news_updates) {
    experiment.news_updates.forEach(({link}) => arr.push(link));
  }
  return arr.filter(item => item);
};

exports.lintImages = (experiment, base) => {
  const missingImages = exports.getImages(experiment)
    .filter(src => {
      const file = path.join(base, staticImagePath(src));
      return !existsSync(file);
    });

  if (missingImages.length) {
    missingImages.forEach(src => console.log(`    - Missing ${src}`));
    process.exitCode = 2;
  }
};

exports.lintUrls = async (experiment) => {
  const urls = exports.getUrls(experiment);
  const results = await checkLinks(urls);
  const missingUrls = urls.filter(link => results[link].status !== "alive");

  if (missingUrls.length) {
    missingUrls.forEach(link => console.log(`    - ${link}`, results[link]));
    process.exitCode = 2;
  }
}
