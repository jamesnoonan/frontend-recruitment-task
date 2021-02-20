# Frontend Recruitment Task - Reality Property App

This solution was built using React (with Tailwind and SASS for styling).

## Future Improvements

If I were to further improve this app, I would make the following changes:

- Search Throttling - for a real backend the input field should be debounced so that results are only requested once the user finishes typing
- Redux - implement Redux so the application would be extensible should more functionality need to be added
- Custom Dropdown Boxes - build a custom dropdown box component to improve the look and interaction of the filters
- Efficiency - currently the algorithm used to generate the possible options is viable, but for a large dataset it could become slow (O(x^2) time)
- Header Shape & Image - I couldn't find the image shown on the task for the header, so I just made the background a blue gradient and added a drop shadow from the navbar
