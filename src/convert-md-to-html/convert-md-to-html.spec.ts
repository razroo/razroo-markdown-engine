import { convertMdToHtml } from "./convert-md-to-html";

describe('convertMdToHtml', () => {
  it('should convert app to markdown', async() => {
    const mockMarkdown = `# test
try this`;
    const result = await convertMdToHtml(mockMarkdown);
    expect(result).toEqual(`<h1 id="test"><a href="#test" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a>test</h1>
<p>try this</p>
`)
  })
})