/**
 * Created by Ron on 17/12/2015.
 */
export function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }
    const joined = [baseUrl, url].join('/');
    return joined
        .replace(/[\/]+/g, '/')
        .replace(/\/\?/g, '?')
        .replace(/\/\#/g, '#')
        .replace(/\:\//g, '://');
}
export function buildQueryString(obj) {
    return Object.keys(obj)
        .map(key => (!!obj[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}` : key))
        .join('&');
}
export function getWindowOrigin(w) {
    if (!w && typeof window !== 'undefined') {
        w = window;
    }
    try {
        if (!w || !w.location) {
            return null;
        }
        if (!w.location.origin) {
            return `${w.location.protocol}//${w.location.hostname}${w.location.port ? ':' + w.location.port : ''}`;
        }
        return w.location.origin;
    }
    catch (error) {
        return null;
        // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // error instanceof DOMException && error.name === 'SecurityError'
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvcGV0ZXIvRGV2ZWxvcG1lbnQvbmcyLXVpLWF1dGgvcHJvamVjdHMvbmcyLXVpLWF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOztHQUVHO0FBRUgsTUFBTSxVQUFVLE9BQU8sQ0FBQyxPQUFlLEVBQUUsR0FBVztJQUNsRCxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQyxPQUFPLEdBQUcsQ0FBQztLQUNaO0lBRUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sTUFBTTtTQUNWLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO1NBQ3RCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUFXO0lBQzFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNmLENBQUM7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLENBQVU7SUFDeEMsSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDdkMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztLQUNaO0lBQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ3hHO1FBQ0QsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztLQUMxQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxJQUFJLENBQUM7UUFDWix3RkFBd0Y7UUFDeEYsa0VBQWtFO0tBQ25FO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5VcmwoYmFzZVVybDogc3RyaW5nLCB1cmw6IHN0cmluZykge1xyXG4gIGlmICgvXig/OlthLXpdKzopP1xcL1xcLy9pLnRlc3QodXJsKSkge1xyXG4gICAgcmV0dXJuIHVybDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGpvaW5lZCA9IFtiYXNlVXJsLCB1cmxdLmpvaW4oJy8nKTtcclxuXHJcbiAgcmV0dXJuIGpvaW5lZFxyXG4gICAgLnJlcGxhY2UoL1tcXC9dKy9nLCAnLycpXHJcbiAgICAucmVwbGFjZSgvXFwvXFw/L2csICc/JylcclxuICAgIC5yZXBsYWNlKC9cXC9cXCMvZywgJyMnKVxyXG4gICAgLnJlcGxhY2UoL1xcOlxcLy9nLCAnOi8vJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKG9iajogb2JqZWN0KSB7XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcclxuICAgIC5tYXAoa2V5ID0+ICghIW9ialtrZXldID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKX1gIDoga2V5KSlcclxuICAgIC5qb2luKCcmJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRXaW5kb3dPcmlnaW4odz86IFdpbmRvdykge1xyXG4gIGlmICghdyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgdyA9IHdpbmRvdztcclxuICB9XHJcbiAgdHJ5IHtcclxuICAgIGlmICghdyB8fCAhdy5sb2NhdGlvbikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICghdy5sb2NhdGlvbi5vcmlnaW4pIHtcclxuICAgICAgcmV0dXJuIGAke3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3cubG9jYXRpb24uaG9zdG5hbWV9JHt3LmxvY2F0aW9uLnBvcnQgPyAnOicgKyB3LmxvY2F0aW9uLnBvcnQgOiAnJ31gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHcubG9jYXRpb24ub3JpZ2luO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICAgIC8vIGlnbm9yZSBET01FeGNlcHRpb246IEJsb2NrZWQgYSBmcmFtZSB3aXRoIG9yaWdpbiBmcm9tIGFjY2Vzc2luZyBhIGNyb3NzLW9yaWdpbiBmcmFtZS5cclxuICAgIC8vIGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09ICdTZWN1cml0eUVycm9yJ1xyXG4gIH1cclxufVxyXG4iXX0=