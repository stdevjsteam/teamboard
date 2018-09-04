import { IRouterContext } from 'koa-router';
import { upload } from '../services';

class Files {
  userImage = async (ctx: IRouterContext) => {
    const { User } = ctx.models;
    const { file } = ctx.request.body;
    const { user } = ctx.state;
    const id = user.get('id');

    const path = await upload({
      oldPath: user.get('image'),
      newPath: `static/images/users/${id}-${Date.now()}`,
      file
    });

    await User.update({ image: path }, { where: { id }, returning: true });

    ctx.body = await User.findById(id);
  };

  newsImage = async (ctx: IRouterContext) => {
    const { News } = ctx.models;
    const { file, newsId } = ctx.request.body;
    const news = await News.findById(newsId);

    ctx.assert(news, 400);

    const path = await upload({
      oldPath: news!.get('image'),
      newPath: `static/images/news/${newsId}-${Date.now()}`,
      file
    });

    const response = await News.update(
      { image: path },
      { where: { id: newsId }, returning: true }
    );

    ctx.body = response[1][0];
  };

  upload = async (ctx: IRouterContext) => {
    try {
      const { purpose } = ctx.request.body;
      switch (purpose) {
        case 'user_image':
          await this.userImage(ctx);
          break;

        case 'news_image':
          await this.newsImage(ctx);
          break;

        default:
          ctx.status = 400;
          ctx.body = '';
      }
    } catch (e) {
      ctx.throw(400, 'invalid base64');
    }
  };
}

export default new Files();
