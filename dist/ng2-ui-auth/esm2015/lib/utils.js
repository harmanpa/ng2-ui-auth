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
export function stringifyOptions(options) {
    return Object.keys(options)
        .map(key => (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]))
        .join(',');
}
export function parseQueryString(joinedKeyValue) {
    let key;
    let value;
    return joinedKeyValue.split('&').reduce((obj, keyValue) => {
        if (keyValue) {
            value = keyValue.split('=');
            key = decodeURIComponent(value[0]);
            obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
        }
        return obj;
    }, {});
}
export function flatten(obj) {
    const out = {};
    Object.keys(obj).forEach(key => {
        if (typeof (obj[key]) === 'object') {
            const subobj = flatten(obj[key]);
            Object.keys(subobj).forEach(subkey => out[key + '.' + subkey] = subobj[subkey]);
        }
        else {
            out[key] = obj[key];
        }
    });
    return out;
}
export function expand(obj) {
    const out = {};
    const roots = Object.keys(obj)
        .map(key => key.indexOf('.') > -1 ? key.substring(0, key.indexOf('.')) : key)
        .filter((value, index, array) => array.indexOf(value) === index);
    roots.forEach(key => {
        if (obj[key]) {
            out[key] = obj[key];
        }
        else {
            const childObject = {};
            Object.keys(obj).filter(k => k.startsWith(key + '.')).forEach(k => {
                childObject[k.substr(key.length + 1)] = obj[k];
            });
            out[key] = expand(childObject);
        }
    });
    return out;
}
export function staticify(obj) {
    const out = {};
    Object.keys(obj).forEach(key => {
        switch (typeof (obj[key])) {
            case 'number':
            case 'string':
            case 'boolean':
                out[key] = obj[key];
                break;
            case 'function':
                const tmpObj = staticify({ tmp: obj[key]() });
                out[key] = tmpObj['tmp'];
                break;
            case 'object':
                if (obj[key]) {
                    out[key] = staticify(obj[key]);
                }
                else {
                    out[key] = null;
                }
        }
    });
    return out;
}
export function isCordovaApp() {
    return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvcGV0ZXIvRGV2ZWxvcG1lbnQvbmcyLXVpLWF1dGgvcHJvamVjdHMvbmcyLXVpLWF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE1BQU0sVUFBVSxPQUFPLENBQUMsT0FBZSxFQUFFLEdBQVc7SUFDbEQsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbEMsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUVELE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV4QyxPQUFPLE1BQU07U0FDVixPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztTQUN0QixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztTQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztTQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsR0FBa0I7SUFDakQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsQ0FBVTtJQUN4QyxJQUFJLENBQUMsQ0FBQyxJQUFJLE9BQU8sTUFBTSxLQUFL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QyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1SCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5pbXBvcnQge0lIaWVyYXJjaGljYWxPYmplY3QsIElTaW1wbGVPYmplY3R9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5cclxuZGVjbGFyZSBjb25zdCBjb3Jkb3ZhOiBhbnk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gam9pblVybChiYXNlVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBpZiAoL14oPzpbYS16XSs6KT9cXC9cXC8vaS50ZXN0KHVybCkpIHtcclxuICAgIHJldHVybiB1cmw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBqb2luZWQgPSBbYmFzZVVybCwgdXJsXS5qb2luKCcvJyk7XHJcblxyXG4gIHJldHVybiBqb2luZWRcclxuICAgIC5yZXBsYWNlKC9bXFwvXSsvZywgJy8nKVxyXG4gICAgLnJlcGxhY2UoL1xcL1xcPy9nLCAnPycpXHJcbiAgICAucmVwbGFjZSgvXFwvXFwjL2csICcjJylcclxuICAgIC5yZXBsYWNlKC9cXDpcXC8vZywgJzovLycpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvYmo6IElTaW1wbGVPYmplY3QpOiBzdHJpbmcge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopXHJcbiAgICAubWFwKGtleSA9PiAoISFvYmpba2V5XSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSl9YCA6IGtleSkpXHJcbiAgICAuam9pbignJicpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93T3JpZ2luKHc/OiBXaW5kb3cpOiBzdHJpbmcgfCBudWxsIHtcclxuICBpZiAoIXcgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHcgPSB3aW5kb3c7XHJcbiAgfVxyXG4gIHRyeSB7XHJcbiAgICBpZiAoIXcgfHwgIXcubG9jYXRpb24pIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoIXcubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICAgIHJldHVybiBgJHt3LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3LmxvY2F0aW9uLmhvc3RuYW1lfSR7dy5sb2NhdGlvbi5wb3J0ID8gJzonICsgdy5sb2NhdGlvbi5wb3J0IDogJyd9YDtcclxuICAgIH1cclxuICAgIHJldHVybiB3LmxvY2F0aW9uLm9yaWdpbjtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXHJcbiAgICAvLyBlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSAnU2VjdXJpdHlFcnJvcidcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5T3B0aW9ucyhvcHRpb25zOiBJU2ltcGxlT2JqZWN0KTogc3RyaW5nIHtcclxuICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgIC5tYXAoa2V5ID0+IChvcHRpb25zW2tleV0gPT09IG51bGwgfHwgb3B0aW9uc1trZXldID09PSB1bmRlZmluZWQgPyBrZXkgOiBrZXkgKyAnPScgKyBvcHRpb25zW2tleV0pKVxyXG4gICAgLmpvaW4oJywnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmcoam9pbmVkS2V5VmFsdWU6IHN0cmluZyk6IHsgW2s6IHN0cmluZ106IHN0cmluZyB8IHRydWUgfSB7XHJcbiAgbGV0IGtleTtcclxuICBsZXQgdmFsdWU7XHJcbiAgcmV0dXJuIGpvaW5lZEtleVZhbHVlLnNwbGl0KCcmJykucmVkdWNlKFxyXG4gICAgKG9iaiwga2V5VmFsdWUpID0+IHtcclxuICAgICAgaWYgKGtleVZhbHVlKSB7XHJcbiAgICAgICAgdmFsdWUgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xyXG4gICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVswXSk7XHJcbiAgICAgICAgb2JqW2tleV0gPSB0eXBlb2YgdmFsdWVbMV0gIT09ICd1bmRlZmluZWQnID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzFdKSA6IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0sXHJcbiAgICB7fSBhcyB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCB0cnVlIH1cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihvYmo6IElIaWVyYXJjaGljYWxPYmplY3QpOiBJU2ltcGxlT2JqZWN0IHtcclxuICBjb25zdCBvdXQgPSB7fSBhcyBJU2ltcGxlT2JqZWN0O1xyXG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiAob2JqW2tleV0pID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBjb25zdCBzdWJvYmogPSBmbGF0dGVuKG9ialtrZXldIGFzIElIaWVyYXJjaGljYWxPYmplY3QpO1xyXG4gICAgICBPYmplY3Qua2V5cyhzdWJvYmopLmZvckVhY2goc3Via2V5ID0+IG91dFtrZXkgKyAnLicgKyBzdWJrZXldID0gc3Vib2JqW3N1YmtleV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0W2tleV0gPSBvYmpba2V5XSBhcyBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbDtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gb3V0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kKG9iajogSVNpbXBsZU9iamVjdCk6IElIaWVyYXJjaGljYWxPYmplY3Qge1xyXG4gIGNvbnN0IG91dCA9IHt9IGFzIElIaWVyYXJjaGljYWxPYmplY3Q7XHJcbiAgY29uc3Qgcm9vdHMgPSBPYmplY3Qua2V5cyhvYmopXHJcbiAgICAubWFwKGtleSA9PiBrZXkuaW5kZXhPZignLicpID4gLTEgPyBrZXkuc3Vic3RyaW5nKDAsIGtleS5pbmRleE9mKCcuJykpIDoga2V5KVxyXG4gICAgLmZpbHRlcigodmFsdWUsIGluZGV4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcclxuICByb290cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBpZiAob2JqW2tleV0pIHtcclxuICAgICAgb3V0W2tleV0gPSBvYmpba2V5XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkT2JqZWN0ID0ge30gYXMgSVNpbXBsZU9iamVjdDtcclxuICAgICAgT2JqZWN0LmtleXMob2JqKS5maWx0ZXIoayA9PiBrLnN0YXJ0c1dpdGgoa2V5ICsgJy4nKSkuZm9yRWFjaChrID0+IHtcclxuICAgICAgICBjaGlsZE9iamVjdFtrLnN1YnN0cihrZXkubGVuZ3RoICsgMSldID0gb2JqW2tdO1xyXG4gICAgICB9KTtcclxuICAgICAgb3V0W2tleV0gPSBleHBhbmQoY2hpbGRPYmplY3QpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGF0aWNpZnkob2JqOiBvYmplY3QpOiBJSGllcmFyY2hpY2FsT2JqZWN0IHtcclxuICBjb25zdCBvdXQgPSB7fSBhcyBJSGllcmFyY2hpY2FsT2JqZWN0O1xyXG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgc3dpdGNoICh0eXBlb2YgKG9ialtrZXldKSkge1xyXG4gICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICBvdXRba2V5XSA9IG9ialtrZXldIGFzIHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcclxuICAgICAgICBjb25zdCB0bXBPYmogPSBzdGF0aWNpZnkoe3RtcDogKG9ialtrZXldIGFzIEZ1bmN0aW9uKSgpfSk7XHJcbiAgICAgICAgb3V0W2tleV0gPSB0bXBPYmpbJ3RtcCddO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgIGlmIChvYmpba2V5XSkge1xyXG4gICAgICAgICAgb3V0W2tleV0gPSBzdGF0aWNpZnkob2JqW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvdXRba2V5XSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NvcmRvdmFBcHAoKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHR5cGVvZiBjb3Jkb3ZhID09PSAnb2JqZWN0JyB8fCAoZG9jdW1lbnQuVVJMLmluZGV4T2YoJ2h0dHA6Ly8nKSA9PT0gLTEgJiYgZG9jdW1lbnQuVVJMLmluZGV4T2YoJ2h0dHBzOi8vJykgPT09IC0xKTtcclxufVxyXG4iXX0=