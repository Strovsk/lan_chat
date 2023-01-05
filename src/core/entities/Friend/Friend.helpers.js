export async function filterRequest(response) {
  const blob = Buffer.from((await response.arrayBuffer()));
      const [type, ext] = response.headers
        .get('Content-Type')
        .split('/');

      if (!type.startsWith('image')) {
        throw new Error('The file must be an image');
      }

      return { blob, ext };
}

export function isExternalLink(link) {
  const httpLinkPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return httpLinkPattern.test(link);
}

export function isData64(link) {
  const base64Pattern = /^data:image\/[a-zA-Z]+;base64,([A-Za-z0-9+/]*={0,2})$/;
  return base64Pattern.test(link);
}
