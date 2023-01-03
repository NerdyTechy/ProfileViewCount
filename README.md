# ProfileViewCount
A simple Express API to generate a badge showing profile views.
Useful for GitHub profile READMEs, and more.

This tool utilises [shields.io](https://shields.io) to generate
a custom badge displaying the number of people who have visited
your profile.

The API increments the view count every time there is a request
for the badge, meaning that every time somebody visits your
profile, the view count will be incremented by 1.

## Usage
To generate a view count, deploy this project, then add the
badge to your profile by using your username as the endpoint.

For example, if this was deployed locally, you would use
```
http://127.0.0.1:5000/YourUsername
```

## Example
![Example Image](https://cdn.techy.lol/img/URS90.png)

## Customising
The badges can also be customised with a color and style
query option.

For example, to change the color, you can use
```
http://127.0.0.1:5000/YourUsername?color=red
```
And to change the style, you can use
```
http://127.0.0.1:5000/YourUsername?style=flat
```
Combining the two, you can change the style and colour by using
```
http://127.0.0.1:5000/YourUsername?style=flat&color=red
```

- For a list of available styles, click [here](https://shields.io/#styles)
- For a list of available colors, click [here](https://shields.io/#colors)