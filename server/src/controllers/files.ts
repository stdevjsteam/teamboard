import { IRouterContext } from 'koa-router';
import { upload } from '../services';

class Files {
  userPhoto = async (ctx: IRouterContext) => {
    const { User } = ctx.models;
    const { file } = ctx.request.body;
    const { user } = ctx.state;
    const id = user.get('id');

    const path = await upload({
      oldPath: user.get('photo'),
      newPath: `static/images/users/${id}-${Date.now()}`,
      file
    });

    await User.update({ photo: path }, { where: { id }, returning: true });

    ctx.body = await User.findById(id);
  };

  newsImage = async (ctx: IRouterContext) => {
    const { News } = ctx.models;
    const { file, newsId } = ctx.request.body;
    const news = await News.findById(newsId, { raw: false });

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
        case 'user_photo':
          await this.userPhoto(ctx);
          break;

        case 'news_image':
          await this.newsImage(ctx);
          break;

        default:
          ctx.status = 400;
          ctx.body = '';
      }
    } catch (e) {
      console.log(e);
      ctx.throw(400, 'invalid base64');
    }
  };
}

export default new Files();
