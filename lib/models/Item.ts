import { Model } from '@nozbe/watermelondb'
import { field, date, text } from '@nozbe/watermelondb/decorators'

export default class Item extends Model {
  static table = 'items'

  @text('title') title!: string
  @text('description') description!: string
  @date('created_at') created_at!: number
}
